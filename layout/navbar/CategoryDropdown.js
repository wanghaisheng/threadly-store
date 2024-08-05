import React, { useState, useEffect, useRef, useCallback, useMemo } from "react"
import styled from "styled-components"
import { CSSTransition } from "react-transition-group"

import ChevronDown from "@/public/images/icons/chevron-down.svg"
import ChevronLeft from "@/public/images/icons/chevronLeft.svg"

import { useMobileView } from "../../context/MobileViewContext"
import MobileDrawer from "@/public/images/icons/mobileDrawer.svg"
import Backdrop from "../Backdrop"
import PropFilter from "../../utils/PropFilter"
import { useRouter } from "next/router.js"
import CategoriesConfig from "../../utils/CategoriesConfig"
import useScrollControl from "hooks/useScrollControl"

const Dropdown = styled.div`
  position: absolute;
  top: 63px;
  width: 275px;
  background-color: var(--sc-color-white);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  padding-bottom: 8px;
  overflow: hidden;
  z-index: -100;
  box-sizing: content-box;
  transition: visibility 0s, transform 0.3s cubic-bezier(0.3, 0.85, 0, 1),
    height var(--speed) ease;
  left: ${(props) => props.left}px;
  transform: translateY(-1000px); // Initially move it up slightly and hide

  &.visible {
    visibility: visible;
    transform: translateY(0); // Slide it into place
  }

  &.invisible {
    transform: translateY(-1000px);
  }

  &.initial-hidden {
    transform: translateY(-1000px);
    transition: none;
  }

  @media (max-width: 768px) {
    top: 110px;
  }
`

const CategoryButton = styled(PropFilter("button")(["isOpen"]))`
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  color: var(--sc-color-text);
  padding-left: 16px;
  padding-right: 8px;
  height: 100%;
  border-radius: 10px;
  align-items: center;
  background-color: ${({ isOpen }) => (isOpen ? "#f7f7f7" : "#fff")};
  display: flex;
  align-items: center;
  transition: background-color 0.2s;

  svg {
    fill: var(--sc-color-icon);
  }

  &:hover {
    background-color: var(--sc-color-white-highlight);

    svg {
      opacity: 1;
    }
  }

  &:hover .arrow-icon,
  &.arrow-icon-visible .arrow-icon svg {
    opacity: 1;
  }

  &:focus:not(:focus-visible) {
    --s-focus-ring: 0;
  }

  &.initial-hidden {
    opacity: 0;
    transform: translateY(20px);
    transition: none;
  }

  @media (max-width: 768px) {
    font-size: 30px;
    height: 44px;
    width: 44px;
    padding: 0;
    justify-content: center;
    background-color: transparent;

    &:active {
      background-color: var(--sc-color-white-highlight);
    }

    &:hover {
      background-color: transparent;
    }
  }
`

const Menu = styled.div`
  width: 100%;

  & a:focus {
    text-decoration: underline;
    outline: none;
  }
`

const MenuItem = styled.li`
  height: 50px;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  font-size: 16px;
  color: #000;
  width: 100%;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: rgb(245, 246, 248);
  }

  &:focus:not(:focus-visible) {
    --s-focus-ring: 0;
    box-shadow: none;
  }

  span {
    margin-left: 5px;
  }
`

const ListHeader = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  transition: background var(--speed);
  font-size: 18px;
  font-weight: 600;
  color: #000;
  width: 100%;
  text-decoration: none;

  &:focus {
    text-decoration: underline;
    outline: none;
  }
`

const ReturnButton = styled.div`
  -webkit-box-align: center;
  place-items: center;
  border-radius: 4px;
  display: flex;
  margin-right: 8px;
  cursor: pointer;

  svg {
    height: 16px;
    width: 16px;
  }

  svg > path {
    fill: var(--sc-color-icon);
  }
`

const BtnText = styled.div`
  padding: 0 5px;
`

const CategoryDropdown = ({ isOpen: parentIsOpen, onToggle }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {}, [parentIsOpen])

  return (
    <NavItem isOpen={isMounted && parentIsOpen} onToggle={onToggle}>
      <DropdownMenu
        isOpen={isMounted && parentIsOpen}
        categories={CategoriesConfig}
      />
    </NavItem>
  )
}

function NavItem(props) {
  const { isOpen, onToggle } = props
  const btnRef = useRef(null)
  const [dropdownLeft, setDropdownLeft] = useState(0)
  const [isScrollDisabled, setIsScrollDisabled] = useScrollControl()
  const isMobileView = useMobileView()
  const [isMounted, setIsMounted] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)

  useEffect(() => {
    setIsMounted(true)
    setTimeout(() => setInitialLoad(false), 0) // Ensure initialLoad is set to false after the initial render

    if (isOpen) {
      setIsScrollDisabled(true)
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect()
        setDropdownLeft(rect.left)
        btnRef.current.focus()
      }
    } else {
      setIsScrollDisabled(false)
    }
  }, [isOpen, setIsScrollDisabled])

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onToggle()
      btnRef.current.focus() // Return focus to the button when closed
    }
  }

  // Prevent the dropdown from being opened by clicking on the backdrop component as it closes
  const handleToggle = useCallback(() => {
    if (isOpen) {
      onToggle()
    }
  }, [isOpen, onToggle])

  return (
    <>
      <Backdrop
        className={initialLoad ? "initial-hidden" : isOpen ? "visible" : ""}
        onClick={handleToggle}
      />
      {isMobileView ? (
        <CategoryButton isOpen={!isOpen} onClick={onToggle}>
          <MobileDrawer />
        </CategoryButton>
      ) : (
        <CategoryButton
          onClick={onToggle}
          onKeyDown={handleKeyDown}
          ref={btnRef}
          isOpen={isOpen}
          aria-haspopup="true"
          aria-expanded={isOpen}
          className={`${initialLoad ? "initial-hidden" : ""} ${
            isOpen ? "arrow-icon-visible" : ""
          }`}
        >
          <BtnText>Categories</BtnText>
          <div className={`arrow-icon ${isOpen ? "rotate-arrow" : ""}`}>
            <ChevronDown />
          </div>
        </CategoryButton>
      )}
      {React.cloneElement(props.children, {
        dropdownLeft: isMobileView ? 0 : dropdownLeft,
        setOpen: onToggle,
        className: `${
          initialLoad ? "initial-hidden" : isOpen ? "visible" : "invisible"
        }`, // Add the visibility class only after mounted
      })}
    </>
  )
}

function DropdownItem({
  children,
  goToMenu,
  hasSubCategories,
  href,
  setActiveMenu,
  setOpen,
  isOpen,
}) {
  const router = useRouter()

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (goToMenu) {
        setActiveMenu(goToMenu)
      } else {
        setOpen(false)
      }
    }
  }

  const handleClick = () => {
    if (goToMenu) {
      setActiveMenu(goToMenu)
    } else {
      setOpen(false)
      router.push(href)
    }
  }

  return hasSubCategories ? (
    <MenuItem
      onClick={handleClick}
      role="menuitem"
      tabIndex={isOpen ? 0 : -1} // Make it focusable only if isOpen is true
      onKeyDown={handleKeyDown}
    >
      {children}
    </MenuItem>
  ) : (
    <MenuItem
      onClick={handleClick}
      role="menuitem"
      tabIndex={isOpen ? 0 : -1} // Make it focusable only if isOpen is true
      onKeyDown={handleKeyDown}
    >
      {children}
    </MenuItem>
  )
}

function DropdownMenu({
  categories,
  dropdownLeft,
  setOpen,
  className,
  isOpen,
}) {
  const [activeMenu, setActiveMenu] = useState("main")
  const [menuHeight, setMenuHeight] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    if (dropdownRef.current?.firstChild) {
      setMenuHeight(dropdownRef.current.firstChild.offsetHeight)
    }
  }, [categories]) // Recalculate height when categories changes

  function calcHeight(el) {
    const height = el.offsetHeight
    setMenuHeight(height)
  }

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false)
    }
  }

  const getSubCategories = (parentId) => {
    const category = CategoriesConfig.find(
      (category) => category.id === parentId
    )
    return category ? category.subCategories || [] : []
  }

  return (
    <Dropdown
      style={{ height: menuHeight, left: dropdownLeft }}
      ref={dropdownRef}
      role="menu"
      onKeyDown={handleKeyDown}
      className={className} // Apply the visibility class
    >
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <Menu>
          <ListHeader>All categories</ListHeader>
          {CategoriesConfig.map((category) => (
            <DropdownItem
              key={category.id}
              goToMenu={
                category.subCategories && category.subCategories.length > 0
                  ? category.id
                  : null
              }
              hasSubCategories={
                category.subCategories && category.subCategories.length > 0
              }
              href={`/categories/${category.slug}`}
              setActiveMenu={setActiveMenu}
              setOpen={setOpen}
              isOpen={isOpen}
            >
              <span>{category.name}</span>
            </DropdownItem>
          ))}
        </Menu>
      </CSSTransition>

      {CategoriesConfig.map((category) => (
        <CSSTransition
          key={category.id}
          in={activeMenu === category.id}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}
        >
          <Menu>
            <ListHeader>
              <ReturnButton
                onClick={() => setActiveMenu("main")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setActiveMenu("main")}
              >
                <ChevronLeft />
              </ReturnButton>
              {category.name}
            </ListHeader>
            {getSubCategories(category.id).map((subCategory) => (
              <DropdownItem
                key={subCategory.id}
                href={`/categories/${subCategory.slug}`}
                setOpen={setOpen}
                isOpen={isOpen}
                setActiveMenu={setActiveMenu}
              >
                {subCategory.name}
              </DropdownItem>
            ))}
          </Menu>
        </CSSTransition>
      ))}
    </Dropdown>
  )
}

export default CategoryDropdown
