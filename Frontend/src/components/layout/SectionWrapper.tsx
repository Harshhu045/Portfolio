type Props = {
  children: React.ReactNode
  id?: string
}

export default function SectionWrapper({ children, id }: Props) {
  return (
    <section
      id={id}
      className="relative py-40 border-b border-white/5"
    >
      {children}
    </section>
  )
}