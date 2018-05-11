import React from 'react';
import './Contact.css';

export default function Contact(){
    return(
        <div>
            <h1>Contact component here</h1>
            <div>
                <div>
                    <h2>Raymundo Yazzie</h2>
                    <p><a href="mailto:test@email.com">test@email.com</a></p>
                    <p><a href="tel:555-555-5555">555-555-5555</a></p>
                    <img src="#" alt="Raymundo Profile"/>
                </div>
                <div>
                    <h2>Jenny Jones Yazzie</h2>
                    <p><a href="mailto:test@email.com">test@email.com</a></p>
                    <p><a href="tel:555-555-5555">555-555-5555</a></p>
                    <img src="#" alt="Jenny Profile"/>
                </div>
            </div>
        </div>
    )
}