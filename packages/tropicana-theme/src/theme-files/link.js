import React from "react"
import { connect, styled } from "frontity"
import Link from "@frontity/components/link";

const MarsLink = ({href, actions, children, ...props}) => {
    return (
        <div>
            <Link {...props}
                // href={href}
                link={href}
                onClick={e => {
                    e.preventDefault()
                    window.scrollTo(0, 0)
                    actions.router.set(href)
                }}
            >
                {children}
            </Link>
        </div>
    )
}

export default connect(MarsLink, { injectProps: false })