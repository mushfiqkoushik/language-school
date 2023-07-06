
export default function ClassCard() {
  return (
    <div className="max-w-xs rounded-md mb-10 shadow-md bg-gray-900 text-gray-100">
      <img
        src="https://source.unsplash.com/random/300x300/?2"
        alt=""
        className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">
            Donec lectus leo
          </h2>
          <p className="text-gray-100">
            Curabitur luctus erat nunc, sed ullamcorper erat vestibulum eget.
          </p>
          <p>Class Name : English</p>
          <p>Instructor Name: Koushik</p>
          <p>Instructor Email : k@gmail.com</p>
          <p>Price : 4545</p>
        </div>
        <button
          type="button"
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-violet-400 text-gray-900"
        >
          ADD CLASS
        </button>
      </div>
    </div>
  );
}
