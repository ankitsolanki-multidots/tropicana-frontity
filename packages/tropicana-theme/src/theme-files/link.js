import React from "react"
import { connect, styled } from "frontity"

const Link = ({href, actions, children}) => {
    return (
        <div>
            <a
                href={href}
                onClick={e => {
                    e.preventDefault()
                    window.scrollTo(0, 0)
                    actions.router.set(href)
                }}
            >
                {children}
            </a>
        </div>
    )
}

export default connect(Link)