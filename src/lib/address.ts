import { useWallet } from './wallet'

// EDIT
export const AddressesMainnet = {
  Fomo: '0x863C60713d5eFb7373058E716303C80b594F9f21',
  TierMint: '0x349953623368c0789a641e128c3Ff17ad075bd54',
  Inviters: '0x83048F0182FBd3845eff1AfBd5F4D2BDe3f03328',
  Fdao: '0x7371f453a20B18D21c9D0DabE822BC417408aB02',
  Buyer: '0x8dB6bed10BeB2195A2106bda37e0FfE5DbB638eD',
}

export const AddressesTestnet = {
  Fomo: '0xf72393176CE5423a703b095600c23ccA790f4419',
  TierMint: '0x7Eb5d36284B46D29440196ba1F74B2DdE6f95054',
  Inviters: '0x2a5480c25649aAe2058e9701dBBe0c1e187C9FD7',
  Fdao: '0x8c48355548890c0Cb973aCbBCf4ce5b5B8c85b66',
  Buyer: '0xe64d3fe8daC38E035206f16e28fBF62cd92C076F',
}

export const useAddress = () => {
  const { chainId } = useWallet()
  return chainId == 56 ? AddressesMainnet : AddressesTestnet
}
