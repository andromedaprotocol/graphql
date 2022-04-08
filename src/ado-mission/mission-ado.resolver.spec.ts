import { Test, TestingModule } from '@nestjs/testing'
import { MissionAdoResolver } from './mission-ado.resolver'
import { MissionAdoService } from './mission-ado.service'

describe('MissionAdoResolver', () => {
  let resolver: MissionAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionAdoResolver, { provide: MissionAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<MissionAdoResolver>(MissionAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
