import { Field, ObjectType } from '@nestjs/graphql'
import { Coin } from 'src/terra/common/models'

@ObjectType()
export class AggregateExchangeRateVote {
  @Field(() => [Coin])
  exchange_rate_tuples!: Coin[]

  @Field()
  voter!: string
}
