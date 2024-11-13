import React from 'react';
import Navbar from './Navbar';

function App() {
    return (
        <div>
            <Navbar />
            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold">Hello, World!</h1>
                <p>This is your main content area.</p>
            </main>
        </div>
    );
}

export default App;