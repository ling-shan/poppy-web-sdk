export interface Card {
    id: string
    status: number
    createAt: string
    updateAt: string
    remark: string

    appId: string

    name: string
    avatarImg: string | null
    coverImg: string
    intro: string | null
    linkUrl: string | null
  }
