import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { TokenAdoService } from './token-ado.service'

describe('TokenAdoService', () => {
  let service: TokenAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenAdoService,
        {
          provide: getLoggerToken(TokenAdoService.name),
          useValue: {
            error: jest.fn(),
          },
        },
        {
          provide: getTerraToken(),
          useValue: {},
        },
      ],
    }).compile()

    service = module.get<TokenAdoService>(TokenAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})