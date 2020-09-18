import React, { useContext } from "react"
import { SampleContext } from "./SampleProvider"

export const SampleFilter = () => {
    const { setTerms } = useContext(SampleContext)

    return (
        <>
  <div>Filters</div>
  <select defaultValue="" name="filters" className="filter" >
                <option value="0">Select a Filter</option>
                <option value="1">Uploaded By Friends</option>
                <option value="2">Most Downloaded</option>
                <option value="3">Date Added</option>
                <option value="4">Star Rating</option>
            </select>
        </>
    )
}