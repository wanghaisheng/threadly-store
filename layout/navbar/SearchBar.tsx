import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import Search from '@/public/images/icons/search.svg'
import Cancel from '@/public/images/icons/cancel.svg'

const InputForm = styled.form`
  display: flex;
  align-items: center;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  margin-left: auto;
  height: 40px;

  @media (max-width: 768px) {
    padding: 0 20px;
    width: auto;
    margin: 0;
    order: 4;
  }
`

const SearchInput = styled.input`
  padding: 10px;
  border-radius: 8px;
  border-width: 1px;
  border-color: var(--sc-color-border-gray);
  color: #353a44;
  outline: none;
  font-size: 15px;
  width: 400px;
  height: 100%;
  max-width: 650px;
  background-color: #f5f6f8;

  &:focus {
    --s-focus-ring: 0;
    box-shadow: none;
  }
`

const SubmitButton = styled.button`
  right: 32px;
  position: relative;
  color: var(--sc-color-text);
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  display: flex;
  border-radius: 8px;
  border: 1px transparent;

  svg {
    width: 16px;
    height: 16px;
  }

  svg > path {
    fill: #6c7688;
  }

  &:focus:not(:focus-visible) {
    --s-focus-ring: 0;
  }

  &:hover svg > path {
    fill: #474e5a;
  }

  @media (max-width: 768px) {
    right: 5px;
    top: 5px;
    position: absolute;
  }
`

const ClearButton = styled.button`
  position: absolute;
  right: 80px;
  top: 50%;
  height: 60%;
  transform: translateY(-50%);
  background: none;
  border-right: 1px solid #c5cbd1;
  padding: 0px 14px;
  cursor: pointer;

  svg {
    width: 14px;
    height: 14px;
  }

  svg > path {
    fill: #6c7688;
  }

  &:hover svg > path {
    fill: #474e5a;
  }

  &:focus:not(:focus-visible) {
    --s-focus-ring: 0;
  }
`

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?query=${searchTerm}`)
    }
  }

  const clearSearch = () => {
    setSearchTerm('')
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      clearSearch()
    }
  }

  const handleFocus = () => {
    document.addEventListener('keydown', handleKeyDown)
  }

  const handleBlur = () => {
    document.removeEventListener('keydown', handleKeyDown)
  }

  return (
    <SearchContainer>
      <InputForm onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="What can we help you find?"
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-label="Search for products"
        />
        {searchTerm && (
          <ClearButton onClick={clearSearch} aria-label="Clear search">
            <Cancel />
          </ClearButton>
        )}
        <SubmitButton type="submit" aria-label="Submit search">
          <Search />
        </SubmitButton>
      </InputForm>
    </SearchContainer>
  )
}

export default SearchBar
