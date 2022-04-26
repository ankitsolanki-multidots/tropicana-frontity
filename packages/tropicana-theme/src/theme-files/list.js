import React from "react"
import { connect, styled } from "frontity"
import Link from "./link"

const List = ({ state, actions }) => {
    const data = state.source.get(state.router.link)


    return (
        <Items>
            { data.items.map( item => {
                const post = state.source.post[item.id]
                const author = state.source.author[post.author]
                console.log(post)
                return (
                    <Link key={item.id} href={post.link}>
                        {post.title.rendered}
                        <p><strong>Posted: </strong>{post.date}</p>
                        <p><strong>Author: </strong>{author.name}</p>
                    </Link>
                )
            })}
            <PrevNextNav>
                {
                    data.previous && <button onClick={ () => {
                        actions.router.set(data.previous)
                    } }>
                        &#171; Prev
                    </button>
                }
                {
                    data.next && <button onClick={ () => {
                        actions.router.set(data.next)
                    } }>
                        Next &#187;
                    </button>
                }
            </PrevNextNav>
        </Items>
    )
}

export default connect(List)

const Items = styled.div`
    & > div {
        margin: 12px 0;
        font-size: 1.2em;
    }
`
const PrevNextNav = styled.div`

    padding-top: 1.5em;

    & > button {
        background: #eee;
        text-decoration: none;
        padding: 0.5em 1em;
        color: #888;
        border: 1px solid #aaa;
        font-size: 0.8em;
        margin-right: 2em;
    }
    & > button:hover {
        cursor: pointer;
    }
`