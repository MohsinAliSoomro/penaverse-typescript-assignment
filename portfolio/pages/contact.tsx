export default function Contact() {
  return (
    <div className="flex items-center justify-center w-full h-[90vh]">
      <form className="flex flex-col space-y-5 border rounded-lg p-4 w-full lg:w-3/12 text-secondary1 ">
        <p className="text-2xl text-center text-">Hire me </p>
        <div >
          <label className="">Email</label>
          <input placeholder="Email"  className="w-full rounded p-2 flex text-secondary3 bg-transparent border outline-none" />
        </div>
        <div>
          <label>Message</label>
          <textarea placeholder="Write Message" rows={4} className="w-full rounded p-2 flex text-secondary3 bg-transparent border outline-none" />
        </div>
        <button className="w-full rounded p-2 text-center border">Submit</button>
      </form>
    </div>
  );
}
