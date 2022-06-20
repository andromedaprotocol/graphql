import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
// import { ThrottlerModule } from '@nestjs/throttler'
import { LoggerModule } from 'nestjs-pino'
import { TerraModule } from 'nestjs-terra'
import { join } from 'path'
import pino from 'pino'
import { AddressListAdoModule } from './ado/address-list/address-list.module'
import { AnchorAdoModule } from './ado/anchor/anchor.module'
import { AppAdoModule } from './ado/app/app.module'
import { AuctionAdoModule } from './ado/auction/auction.module'
import { registerEnums } from './ado/common/enums'
import { CrowdfundAdoModule } from './ado/crowdfund/crowdfund.module'
import { CW20TokenAdoModule } from './ado/cw20-token/cw20-token.module'
import { NftCollectibleAdoModule } from './ado/nft/nft.module'
import { AdoOffersModule } from './ado/offers/offers.module'
import { PrimitiveAdoModule } from './ado/primitive/primitive.module'
import { RatesAdoModule } from './ado/rates/rates.module'
import { ReceiptAdoModule } from './ado/receipt/receipt.module'
import { SplitterAdoModule } from './ado/splitter/splitter.module'
import { TimelockAdoModule } from './ado/timelock/timelock.module'
import { VaultAdoModule } from './ado/vault/vault.module'
import { AnythingScalar } from './anything.scalar'
import { AppResolver } from './app.resolver'
import { CosmModule } from './cosm'
//import { AuthModule } from './auth/auth.module'
//import { BankModule } from './bank/bank.module'
//import { DistributionModule } from './distribution/distribution.module'
import { validate } from './env.validation'
//import { registerEnums } from './terra/common/enums'
// import { GovModule } from './gov/gov.module'
// import { IbcModule } from './ibc/ibc.module'
// import { MarketModule } from './market/market.module'
// import { MintModule } from './mint/mint.module'
// import { MsgauthModule } from './msgauth/msgauth.module'
// import { OracleModule } from './oracle/oracle.module'
// import { SlashingModule } from './slashing/slashing.module'
// import { StakingModule } from './staking/staking.module'
// import { TendermintModule } from './tendermint/tendermint.module'
// import { TreasuryModule } from './treasury/treasury.module'
// import { TxModule } from './tx/tx.module'
// import { UtilsModule } from './utils/utils.module'
//import { WasmModule } from './terra/wasm/wasm.module'

@Module({
  imports: [
    ConfigModule.forRoot({ cache: true, validate }),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const pinoHttp: pino.LoggerOptions = {
          name: config.get<string>('LOG_NAME'),
          level: config.get<string>('LOG_LEVEL'),
          prettyPrint: false,
        }

        if (config.get<string>('NODE_ENV') !== 'production') {
          pinoHttp.prettyPrint = {
            colorize: true,
            singleLine: true,
            translateTime: true,
          }
        }

        return { pinoHttp }
      },
    }),
    //     ThrottlerModule.forRootAsync({
    //       imports: [ConfigModule],
    //       inject: [ConfigService],
    //       useFactory: (config: ConfigService) => ({
    //         ttl: parseInt(config.get<string>('THROTTLE_TTL', '60'), 10),
    //         limit: parseInt(config.get<string>('THROTTLE_LIMIT', '20'), 10),
    //       }),
    //     }),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        registerEnums() // register enums graphql

        return {
          sortSchema: config.get<string>('GRAPHQL_SORT_SCHEMA', 'true') === 'true',
          debug: config.get<string>('GRAPHQL_DEBUG', 'false') === 'true',
          playground: config.get<string>('GRAPHQL_PLAYGROUND', 'false') === 'true',
          autoSchemaFile: join(process.cwd(), 'src/schema.graphql'),
          introspection: config.get<string>('GRAPHQL_INTROSPECTION', 'true') === 'true',
        }
      },
    }),
    CosmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const RPC_URL = config.get<string>('JUNO_RPC_URL')
        if (!RPC_URL) {
          throw new Error('Invalid RPC_URL variable.')
        }

        return {
          RPC_URL,
        }
      },
    }),
    TerraModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const URL = config.get<string>('LCD_URL')
        const chainID = config.get<string>('CHAIN_ID')

        if (!URL || !chainID) {
          throw new Error('Invalid LCD_URL or CHAIN_ID variables.')
        }

        return {
          URL,
          chainID,
        }
      },
    }),
    //AuthModule,
    // BankModule,
    // DistributionModule,
    // GovModule,
    // MarketModule,
    // MintModule,
    // MsgauthModule,
    // OracleModule,
    // SlashingModule,
    // StakingModule,
    // TendermintModule,
    // TreasuryModule,
    //WasmModule,
    // TxModule,
    // UtilsModule,
    // IbcModule,
    AddressListAdoModule,
    AdoOffersModule,
    AnchorAdoModule,
    AppAdoModule,
    AuctionAdoModule,
    CrowdfundAdoModule,
    CW20TokenAdoModule,
    NftCollectibleAdoModule,
    PrimitiveAdoModule,
    RatesAdoModule,
    ReceiptAdoModule,
    SplitterAdoModule,
    TimelockAdoModule,
    VaultAdoModule,
  ],
  providers: [AppResolver, AnythingScalar],
})
export class AppModule {}
