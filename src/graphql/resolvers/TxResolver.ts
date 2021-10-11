import { Resolver, Query, Arg } from 'type-graphql'
import { Service } from 'typedi'
import { Tx } from 'graphql/schema'
import { TxService } from 'services'

@Service()
@Resolver((of) => Tx)
export class TxResolver {
    constructor(private readonly txService: TxService) {}
  @Query((returns) => [Tx])
  async txs(
    @Arg('sender') sender: string,
    @Arg('offset', { defaultValue: 0 }) offset: number,
    @Arg('limit', { defaultValue: 100 }) limit: number,
  ): Promise<Tx[]> {
    if (limit > 1000) {
      throw new Error('limit is too high')
    }
    return this.txService.getHistory(sender, offset, limit)
  }
}
