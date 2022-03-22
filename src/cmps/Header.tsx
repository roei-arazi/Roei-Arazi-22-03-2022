import { useEffect, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { HiSwitchVertical } from "react-icons/hi"
import { GiHamburgerMenu } from "react-icons/gi"
import { Link } from "react-router-dom";
import { applyDarkMode, applyDegrees } from "../store/weatherActions";

export function Header() {

    const { isDark, degrees } = useSelector((state: RootStateOrAny) => state.weatherReducer)
    const [isModal, setModal] = useState<boolean>(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(applyDarkMode(null))
        dispatch(applyDegrees(null))
    }, [dispatch])

    function switchDarkMode(ev: any) {
        ev.stopPropagation()
        dispatch(applyDarkMode(isDark === 1 ? 0 : 1))
    }
    function switchDegrees(ev: any) {
        ev.stopPropagation()
        dispatch(applyDegrees(degrees === 'C' ? 'F' : 'C'))
    }
    function handleModal() {
        setModal(!isModal)
    }
    
    return (
        <div>
            {isModal ?
                <div className={`modal-screen-wrapper w100`} onClick={handleModal}>
                    <ul className={`settings-modal flex column h100 w100 scale-in-ver-top  ${isDark ? 'dark-header' : 'orange-header'}`}>
                        <li>
                            <p className="degrees w100 h100 flex align-center white" onClick={switchDegrees}>{degrees === 'F' ? 'FAHREHNHIGHT' : 'CELSIUS '}<HiSwitchVertical /></p>
                        </li>
                        <li>
                            <p className="w100 h100 flex align-center white" onClick={switchDarkMode} >{isDark ? 'LIGHT MODE' : 'DARK MODE'}</p>
                        </li>
                        <li><Link to="/favorites" className="w100 h100 flex align-center white">MY CITIES</Link></li>
                    </ul>
                </div>
                :
                ''
            }
            <header className={isDark ? 'dark-header ' : ''}>
                <div className="header mobile flex space-between align-center">
                    {isModal ?
                        <h1 onClick={handleModal}><Link to="/">Weather.</Link></h1>
                        :
                        <h1><Link to="/">Weather.</Link></h1>}

                    <p className="header-mobile h100 flex align-center justify-center" onClick={handleModal}><GiHamburgerMenu className="hamburger white" /></p>

                    <ul className="flex h100 header-desktop">
                        <li onClick={switchDegrees}>
                            <p className="white degrees">{degrees === 'F' ? 'Fahrenheit' : 'Celsius '}<HiSwitchVertical /></p>
                        </li>
                        <li>
                            <label className="theme-switch" htmlFor="checkbox">
                                <input type="checkbox" id="checkbox" onClick={switchDarkMode} />
                                <div className="slider round"></div>
                            </label>
                        </li>
                        <li><Link to="/favorites">MY CITIES</Link></li>
                    </ul>
                </div>
            </header>
        </div>

    )
}