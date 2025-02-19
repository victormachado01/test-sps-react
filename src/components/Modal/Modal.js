export default function Modal({ children, onClose }) {
    return (
        <main className="absolute w-full h-screen bg-black/80 flex items-center justify-center">
            <div>
                {children}
            </div>
        </main>
    );
}