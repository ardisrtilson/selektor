// Organized
import React, { useContext } from "react"
import { SampleContext } from "./SampleProvider"

export const SampleFilter = () => {

    const { setFilter } = useContext(SampleContext)

    return (
        <>

        <div>Filters</div>

            <select
                onChange={
                    (changeEvent) => {
                        setFilter(changeEvent.target.value)
                    }
                }>
                <option value="0">Select a Filter</option>
                <option value="1">Uploaded By Friends</option>
                <option value="2">Favorites</option>
            </select>

        </>
    )
}