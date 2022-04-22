import { Test, TestingModule } from '@nestjs/testing'
import { getLoggerToken } from 'nestjs-pino'
import { getTerraToken } from 'nestjs-terra'
import { StakingService } from './staking.service'

describe('StakingService', () => {
  let service: StakingService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StakingService,
        {
          provide: getLoggerToken(StakingService.name),
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

    service = module.get<StakingService>(StakingService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
