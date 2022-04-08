import { Test, TestingModule } from '@nestjs/testing'
import { ReceiptAdoResolver } from './receipt-ado.resolver'
import { ReceiptAdoService } from './receipt-ado.service'

describe('ReceiptAdoResolver', () => {
  let resolver: ReceiptAdoResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReceiptAdoResolver, { provide: ReceiptAdoService, useValue: {} }],
    }).compile()

    resolver = module.get<ReceiptAdoResolver>(ReceiptAdoResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
