// src/components/ClassCard.js
export default function ClassCard({ image, title, description, time, instructor }) {
    return (
        <div className="card glass my-4 md:my-0 w-full md:w-96 h-[34rem] rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105">
            <figure className="w-full h-64 overflow-hidden">
                <img src={image} alt={title} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body p-4">
                <h2 className="text-xl md:text-2xl font-bold text-center mb-2">{title}</h2>
                <p className="text-center mb-4">{description}</p>
                <p className="text-center font-semibold mb-2">Time: {time}</p>
                <p className="text-center mb-4">Instructor: {instructor}</p>
                <div className="card-actions justify-between">
                    <div>
                        <h2 className="mt-2 text-2xl font-bold text-left text-green-400">$40</h2>
                    </div>
                    <button className="btn btn-primary">Join Now</button>
                </div>
            </div>
        </div>
    );
}
