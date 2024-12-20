import React from 'react'
import styled from 'styled-components'
import StarRating from '@/components/ReviewStars/StarRatings'
import Truck from '@/public/images/icons/truck.svg'
import Subscription from '@/public/images/icons/subscription.svg'
import AddToFavoritesButton from '@/components/Shopping/AddToFavoritesButton'
import { useMobileView } from '@/context/MobileViewContext'
import useCurrencyFormatter from 'src/hooks/useCurrencyFormatter'
import { Product } from '@/types/product'

interface ProductInfoProps {
  product: Product
  deliveryDate: string
  dayOfWeek: string
  returnDate: string
  loading: boolean
}

const LoadingProduct = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 50%;
  order: 0; // Make sure product details are at the top in mobile view
  border-radius: 8px;
  background-color: #ededed;
  animation: loadingAnimation 1s ease-in-out infinite;
  animation-fill-mode: forwards;

  @media (max-width: 768px) {
    animation:
      enter 0.3s 0.1s forwards,
      loadingAnimation 1s ease-in-out infinite;
  }
`

const ProductNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border-bottom: 1px solid var(--sc-color-border-gray);
  order: 0; // Make sure product details are at the top in mobile view
`

const ProductName = styled.h1`
  font-size: 23px;
  line-height: 0.9;
  margin-bottom: 8px;
`

const ProductContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  order: 4; // Price and purchase buttons at the bottom in mobile view

  h2 {
    font-weight: bold;
    display: inline-block;
    font-size: 19px;
  }

  @media (min-width: 768px) {
    order: 1; // And below the product details in desktop view

    h1 {
      font-size: 23px;
      font-weight: bold;
      word-break: break-word;
    }

    h2 {
      font-size: 23px;
      font-weight: 700;
    }

    p {
      font-size: 14px;
    }
  }
`

const OriginalPrice = styled.span`
  font-weight: bold;
  display: inline-block;
  font-size: 19px;
  text-decoration: line-through;
`

const Price = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-right: 5px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`

const ShipWrapper = styled.div`
  display: flex;
  font-weight: 700;
  font-size: 16px;
  position: relative;
  align-items: center;

  svg {
    width: 20px;
    height: 20px;
  }
`

const DateWrapper = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 16px;
`

const ShippingOffer = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  padding: 15px 0;
`

const ExchangeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
`

const ExchangeHeader = styled.p`
  font-weight: 800;
  margin-bottom: 4px;
`

const ExchangeBox = styled.div`
  display: flex;
  margin-right: 8px;

  svg {
    width: 20px;
    height: 20px;
  }
`

const ExchangeContent = styled.div`
  display: flex;
  flex-direction: column;
`

const ReviewWrapper = styled.div`
  display: flex;
  font-size: 14px;
  margin: 5px 0;
`

const AddFavsWrapper = styled.div`
  position: absolute;
  right: 0;
`

const StyledTruck = styled(Truck)`
  margin-right: 8px;
`

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  deliveryDate,
  dayOfWeek,
  returnDate,
  loading,
}) => {
  const isMobileView = useMobileView()
  const formatCurrency = useCurrencyFormatter()

  if (loading) {
    return <LoadingProduct />
  }

  console.log(product)

  // Access color variants
  const selectedColorVariant = product.variants?.[0]
  // Access size variants from the selected color variant
  const selectedSize = selectedColorVariant?.sizes?.[0]

  const productPrice = selectedSize?.price || 0
  const productSalePrice = selectedSize?.sale_price || productPrice

  return (
    <>
      <ProductNameWrapper>
        <ProductName>{product.name}</ProductName>
        <AddFavsWrapper>
          <AddToFavoritesButton
            productId={product.product_id?.toString() || ''}
            productName={product?.name}
          />
        </AddFavsWrapper>
        <ReviewWrapper>
          <StarRating reviews={product.reviews ?? []} />
          <button className="average-rating-text">
            {product.reviews?.length === 0 || 0
              ? 'Be the first!'
              : `(${product.reviews?.length} review${product.reviews?.length !== 1 ? 's' : ''})`}
          </button>
        </ReviewWrapper>
        {!isMobileView && (
          <ProductContainer>
            <Price>{formatCurrency(Number(productSalePrice))}</Price>
            {selectedSize?.sale_price && (
              <span>
                reg{' '}
                <OriginalPrice>
                  {formatCurrency(Number(productPrice))}
                </OriginalPrice>
              </span>
            )}
            <ExchangeWrapper>
              <ExchangeBox>
                <Subscription />
              </ExchangeBox>
              <ExchangeContent>
                <ExchangeHeader>15-DAY FREE & EASY RETURNS</ExchangeHeader>
                <p>
                  If received {dayOfWeek}, the last day to return this item
                  would be {returnDate}.
                </p>
              </ExchangeContent>
            </ExchangeWrapper>
            <DateWrapper>Get it by {deliveryDate}</DateWrapper>
            <ShipWrapper>
              <StyledTruck />
              <ShippingOffer>Free Shipping</ShippingOffer>
            </ShipWrapper>
          </ProductContainer>
        )}
      </ProductNameWrapper>
      {isMobileView && (
        <ProductContainer>
          <Price>{formatCurrency(Number(productSalePrice))}</Price>
          {selectedSize?.sale_price && (
            <span>
              reg{' '}
              <OriginalPrice>
                {formatCurrency(Number(productPrice))}
              </OriginalPrice>
            </span>
          )}
          <ExchangeWrapper>
            <ExchangeBox>
              <Subscription />
            </ExchangeBox>
            <ExchangeContent>
              <ExchangeHeader>15-DAY FREE & EASY RETURNS</ExchangeHeader>
              <p>
                If received {dayOfWeek}, the last day to return this item would
                be {returnDate}.
              </p>
            </ExchangeContent>
          </ExchangeWrapper>
          <AddToFavoritesButton
            productId={product.product_id?.toString() || ''}
            productName={product?.name}
          />
          <DateWrapper>Get it by {deliveryDate}</DateWrapper>
          <ShipWrapper>
            <StyledTruck />
            <ShippingOffer>Free Shipping</ShippingOffer>
          </ShipWrapper>
        </ProductContainer>
      )}
    </>
  )
}

export default ProductInfo
