export type Flash = {
  notice?: string
  alert?: string
}

export type User = {
  email_address: string
}

export type SharedProps = {
  flash: Flash
  user?: User
}