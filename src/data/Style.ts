export interface StyleBundle {
  [key: string]: string
}

export interface Style {
  id: string
  appId: string
  status: number
  createAt: string
  updateAt: string

  key: string,
  value: string,
}
