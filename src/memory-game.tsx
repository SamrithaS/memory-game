import React, { useState, useEffect } from "react";
import "./App.css";
import _ from "lodash";
import { Iobj, Iarray, memoryProps } from "./types";

function Memory(props: memoryProps) {
    var arrays: Iarray = props.images.map((i: string, index: number) => {
        return { img: i, id: index }
    })
    const [array, setarray] = useState<Iarray>((arrays));
    const [clickedItem2, setClickedItem2] = useState<Iobj>({
        img: "",
        ind: null,
        class: ""
    });
    const [clickedItem1, setClickedItem1] = useState<Iobj>({
        img: "",
        ind: null,
        class: ""
    });

    useEffect(() => {
        setTimeout(() => {
            if (
                clickedItem2.img !== "" &&
                clickedItem1.img !== ""
            ) {
                setClickedItem1({
                    ...clickedItem1,
                    img: "",
                    ind: null
                });
                setClickedItem2({ ...clickedItem2, img: "", ind: null });
            }

        }, 600);
    }, [clickedItem1, clickedItem2]);

    const handleClick = (item: { img: string; class?: string, id: number }, index: number) => {

        if (clickedItem1.ind === null) {
            setClickedItem1({
                ...clickedItem1,
                img: item.img,
                ind: index,
            });
        }

        if (clickedItem1.ind !== null && clickedItem2.ind === null && clickedItem1.img === item.img && clickedItem1.ind !== index) {
            setTimeout(() => {
                setarray(
                    _.map(array, (item: { img: string; class?: string, id: number }) => {
                        return clickedItem1.ind === item.id ? { id: clickedItem1.ind, img: clickedItem1.img, class: "vanish" } : index === item.id ? { id: index, img: array[index].img, class: "vanish" } : item
                    })

                )
            }, 600);
            setClickedItem2({
                img: item.img,
                ind: index,
                class: "vanish"
            })
            setClickedItem1({
                ...clickedItem1,
                class: "vanish"
            })
        }
        if (clickedItem1.ind !== null && clickedItem2.ind === null && clickedItem1.ind !== index) {
            setClickedItem2({ ...clickedItem2, img: item.img, ind: index });
        }
    };
    return (
        <div className="App">
            <h2>Memory game</h2>
            {(_.filter(array, (item) => { return item.class !== "vanish" })).length === 0 ?
                <div className="play-again">
                    <p>Well done!!</p>
                    <button onClick={() => { window.location.reload(); }}>play again!</button>
                </div> :
                <ul>
                    {_.map(array, (item, index: number) => {
                        return (
                            <li
                                key={index}
                                className={`${item.class} ${index === clickedItem1.ind || index === clickedItem2.ind ? "flip" : ""}`}
                                onClick={() => handleClick(item, index)}
                            >
                                <img src={item.img} alt=""></img>
                                <div className="layer"></div>
                            </li>
                        );
                    })}
                </ul>
            }
        </div>
    );
}

export default Memory;
