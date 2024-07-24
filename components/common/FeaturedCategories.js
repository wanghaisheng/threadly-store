import React, { forwardRef } from "react"
import styled from "styled-components"
import Link from "next/link"
import Image from "next/image"
import CategoriesConfig from "../../utils/CategoriesConfig"

const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; // Space the categories apart evenly
  width: 100%;
  gap: 20px;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease-out, transform 0.5s ease-out;

  &.in-view {
    opacity: 1;
    transform: translateY(0);
  }
`

const NavIcon = styled.div`
  height: 175px;
  width: 175px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--sc-color-white);
  border: 1px solid var(--sc-color-divider);
  margin-bottom: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  div {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: 100%;
    padding: 15px; // Spacing for the image border
  }
`

const NavItem = styled.div`
  text-align: center;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 10px;
  font-weight: 500;
  background-color: transparent;
  max-width: 175px; // Setting a max width so the icons are evenly distributed across the available space
`

const NavTitle = styled.div`
  font-size: 16px;
  margin-top: 5px;
`

const NavLink = styled(Link)`
  text-decoration: none;

  &:hover ${NavIcon} {
    // Apply the transition when we hover over the link
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
`

const FallbackIcon = styled.div`
  background-color: #f0f0f0;
  color: #888;
  font-size: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const FeaturedCategories = forwardRef((props, ref) => {
  return (
    <NavContainer ref={ref} className={props.className}>
      {CategoriesConfig.filter((category) => category.id !== "accessories").map(
        (category) => (
          <NavLink
            key={category.id}
            href={`/categories/${category.slug}`}
            aria-label={`View ${category.name}`}
            passHref
          >
            <NavItem>
              <NavIcon>
                {category.icon ? (
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={500}
                    height={500}
                  />
                ) : (
                  <FallbackIcon>?</FallbackIcon>
                )}
              </NavIcon>
              <NavTitle>{category.name}</NavTitle>
            </NavItem>
          </NavLink>
        )
      )}
    </NavContainer>
  )
})

export default FeaturedCategories
