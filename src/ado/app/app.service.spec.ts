import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { WasmService } from 'src/wasm/wasm.service'
import { AdoAppService } from './app.service'

describe('AdoAppService', () => {
  let service: AdoAppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdoAppService,
        {
          provide: getLoggerToken(AdoAppService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: WasmService,
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<AdoAppService>(AdoAppService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
