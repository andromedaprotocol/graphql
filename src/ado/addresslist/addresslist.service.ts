import { Inject, Injectable } from '@nestjs/common'
import { ApolloError, UserInputError } from 'apollo-server'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoService } from '../ado.service'
import { AddresslistResponse } from '../types'
import { ADDRESSLIST_QUERY_ADDRESS, INVALID_QUERY_ERR } from '../types/ado.constants'
import { queryMsgs } from '../types/ado.querymsg'

@Injectable()
export class AddresslistService extends AdoService {
  constructor(
    @InjectPinoLogger(AddresslistService.name)
    protected readonly logger: PinoLogger,
    @Inject(WasmService)
    protected readonly wasmService: WasmService,
  ) {
    super(logger, wasmService)
  }

  public async includesAddress(contractAddress: string, address: string): Promise<AddresslistResponse> {
    const queryMsgStr = JSON.stringify(queryMsgs.addresslist.includes_address).replace(
      ADDRESSLIST_QUERY_ADDRESS,
      address,
    )
    const queryMsg = JSON.parse(queryMsgStr)

    try {
      const response = await this.wasmService.queryContract(contractAddress, queryMsg)
      return response as AddresslistResponse
    } catch (err: any) {
      this.logger.error({ err }, 'Error getting the wasm contract %s query.', contractAddress)
      if (err instanceof UserInputError || err instanceof ApolloError) {
        throw err
      }

      throw new ApolloError(INVALID_QUERY_ERR)
    }
  }
}
