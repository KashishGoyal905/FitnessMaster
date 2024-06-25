// src/components/ClassCard.js
export default function ClassCard({ image, title, description, time, instructor }) {
    return (
        <div className="card glass w-full md:w-96 h-[34rem] mt-6 md:mt-0">
            <figure>
                <img src={image} alt={title} />
            </figure>
            <div className="card-body">
                <h2 className="text-xl md:text-2xl font-bold text-center">{title}</h2>
                <p className="text-center">{description}</p>
                <p className="text-center font-semibold">Time: {time}</p>
                <p className="text-center">Instructor: {instructor}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Join Now</button>
                </div>
            </div>
        </div>
    );
}
