import { Module } from '@nestjs/common'
import { WasmResolver } from './wasm.resolver'
import { WasmService } from './wasm.service'

@Module({
  providers: [WasmResolver, WasmService],
  exports: [WasmService],
})
export class WasmModule {}
