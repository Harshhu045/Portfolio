type Props = {
  children: React.ReactNode
}

export default function GlassCard({ children }: Props) {
  return (
    <div className="p-6 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-white/20 hover:bg-white/10 transition">
      {children}
    </div>
  )
}