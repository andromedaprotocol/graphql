import { Test, TestingModule } from '@nestjs/testing'
import { CrowdfundAdoResolver } from './crowdfund-ado.resolver'
import { CrowdfundAdoService } from './crowdfund-ado.service'

describe('CrowdfundAdoResolver', () => {
  let resolver: CrowdfundAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CrowdfundAdoResolver, { provide: CrowdfundAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<CrowdfundAdoResolver>(CrowdfundAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})