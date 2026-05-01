import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import Razorpay from "razorpay"

dotenv.config()

const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://portfolio-bice-chi-64.vercel.app"
    ]
}))
app.use(express.json())

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

app.post("/api/contact", async (req, res) => {
  const { name, email, message, intent } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields required" })
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // NOT your real password
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <sanuu9470@gmail.com>`,
      to: "sanuu9470@gmail.com",
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
    res.status(500).json({ error: "Email failed" })
  }
})

const razorpay = new Razorpay({
  key_id:process.env.KEY_ID,
  key_secret:process.nextTick.KEY_SECRET
})

app.post("/api/create-order", async (req, res) => {
  const { amount } = req.body

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "coffee_order",
    })

    res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Order failed" })
  }
})

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001")
})