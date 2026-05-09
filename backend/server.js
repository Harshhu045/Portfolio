import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import Razorpay from "razorpay"

dotenv.config()

const app = express()

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || origin.endsWith(".vercel.app") || origin === "http://localhost:5173") {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    }
}))

app.use(express.json())

// ─── TRANSPORTER (one, at top) ─────────────────────────────
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    family: 4
})

// ─── LEETCODE ──────────────────────────────────────────────
app.get("/api/leetcode/:username", async (req, res) => {
    const { username } = req.params
    try {
        const response = await fetch(
            `https://leetcode-api-faisalshohag.vercel.app/${username}`
        )
        const data = await response.json()
        res.json(data)
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch LeetCode data" })
    }
})

// ─── CONTACT ───────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
    const { name, email, message, intent } = req.body

    if (!name || !email || !message) {
        return res.status(400).json({ error: "All fields required" })
    }

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `New Message from ${name}`,
            html: `
                <h3>New Contact Message</h3>
                <p><b>Name:</b> ${name}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Intent:</b> ${intent}</p>
                <p><b>Message:</b><br/>${message}</p>
            `,
        })

        res.json({ success: true })
    } catch (err) {
        console.error("Email error:", err.message)
        res.status(500).json({ error: "Email failed", detail: err.message })
    }
})

// ─── RAZORPAY ──────────────────────────────────────────────
app.post("/api/create-order", async (req, res) => {
    const { amount } = req.body

    try {
        const razorpay = new Razorpay({
            key_id: process.env.KEY_ID,
            key_secret: process.env.KEY_SECRET,
        })

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: "INR",
            receipt: "coffee_order",
        })

        res.json(order)
    } catch (err) {
        console.error("Razorpay error:", err.message)
        res.status(500).json({ error: "Order failed", detail: err.message })
    }
})

// ─── START ─────────────────────────────────────────────────
app.listen(3001, () => {
    console.log("Server running on http://localhost:3001")
})