import { ArgsType, Field } from '@nestjs/graphql'
import { ValAddress, AccAddress } from 'nestjs-terra'
import { Denom } from 'src/terra/common/enums'
import { GetBaseArgs } from './base.args'

@ArgsType()
export class GetRequiredValidatorArgs extends GetBaseArgs {
  @Field(() => String)
  validator!: ValAddress
}

@ArgsType()
export class GetRequiredDenomArgs extends GetBaseArgs {
  @Field(() => String)
  denom!: Denom
}

@ArgsType()
export class GetRequiredDelegatorArgs {
  @Field(() => String)
  delegator!: AccAddress
}
