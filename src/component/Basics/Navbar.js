import React from 'react'

function Navbar({filterItem, menuList}) {
    return (
        <>
            <nav className="navbar">
                <div className="btn-group">
                    {
                        menuList.map((curElm)=>{
                            return(
                                <button 
                                    className="btn-group__item"
                                    onClick={()=> filterItem(curElm)}>
                                        {curElm}
                                </button>
                            );
                        })
                    }
                   
                </div>
            </nav>            
        </>
    )
}

export default Navbar
