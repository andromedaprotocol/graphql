import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { VaultAdoService } from './vault-ado.service'

describe('VaultAdoService', () => {
  let service: VaultAdoService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VaultAdoService,
        {
          provide: getLoggerToken(VaultAdoService.name),
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

    service = module.get<VaultAdoService>(VaultAdoService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
