import { Test, TestingModule } from '@nestjs/testing'
import { MarketResolver } from './market.resolver'
import { MarketService } from './market.service'

describe('MarketResolver', () => {
  let resolver: MarketResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarketResolver, { provide: MarketService, useValue: {} }],
    }).compile()

    resolver = module.get<MarketResolver>(MarketResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
