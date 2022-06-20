export class LCDClientError extends Error {
  public readonly status: string = '500'

  constructor(err: any) {
    super()

    console.log(err)
    console.log(err?.response?.data)
    this.name = this.constructor.name
    this.message = err.message

    Error.captureStackTrace(this, this.constructor)

    if (err.isAxiosError) {
      const { status = 500, statusText = 'Internal Error' } = err?.response ?? {}
      const dataError = err?.response?.data?.error ?? 'error'
      const message = `[${statusText}] ${dataError}`

      this.status = status
      this.message = message
    }
  }
}
