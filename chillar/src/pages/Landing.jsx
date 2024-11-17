import React from 'react'
import { Footer, TopBar } from '../components'
import collage from '../assets/images/collage.PNG'

export default function Landing() {
    return (
        <div>
            <TopBar />
            <div className="landing-section">
                <div className="landing-image">
                    <img src={collage} alt="Collage" />
                </div>
                <div className="landing-content">
                    <h1>Welcome to Our Website!</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id
                        consectetur velit. Integer sed semper lectus. Donec vel mauris at arcu
                        consectetur bibendum. Sed vel mauris at arcu consectetur bibendum. Sed
                        vel mauris at arcu consectetur bibendum. Sed vel mauris at arcu
                        consectetur bibendum. Sed vel mauris at arcu consectetur bibendum.
                    </p>
                    <div />
                </div>
                <Footer />
            </div>
        </div>
    )
}
