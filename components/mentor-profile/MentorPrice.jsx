import React from "react";
import { toast } from "react-toastify";

const MentorPrice = ({ mentor, currentUser }) => {
  const applyToMentor = async () => {
    try {
      const response = await fetch(
        `/api/mentees/applications?menteeId=${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 0 },
          body: JSON.stringify({ mentorId: mentor._id }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(
          "Başvurunuz alındı. Mentorunuz en kısa sürede size dönüş yapacak."
        );
        window.location.reload();
      } else {
        toast.error("Başvurunuz alınamadı. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      toast.error("Başvurunuz alınamadı. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div>
      <div className="my-8 lg:my-0 w-full sm:w-[420px] lg:left-[55%] xl:left-2/3 lg:fixed lg:top-[15%]">
        <div className="p-0 w-full h-fit" id="plan-float-b">
          <div className="block rounded-2xl bg-white border-2 border-solid border-slate-300 overflow-hidden">
            <div>
              <div className="px-6 pt-6 pb-8">
                <p className="text-4xl font-extrabold text-slate-900">
                  <span className="price-element">{mentor.price || 100} ₺</span>{" "}
                  <span className="text-xl">/ Ay</span>
                </p>
                <div className="mt-2 text-slate-900">
                  Herhangi bir seviyede kariyerinizde bir sonraki adımı
                  planlayın: mülakat hazırlığı, pazar araştırması, strateji
                </div>
                <div className="flex flex-col">
                  <div className="mt-4 text-slate-900">
                    <p className="mb-2 flex">
                      <svg
                        className="w-5 h-5 mr-1 align-sub text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                        ></path>
                      </svg>
                      <span>İstediğin gibi mesajlaş</span>
                    </p>
                    <p className="mb-2 flex cursor-pointer">
                      <svg
                        className="w-5 h-5 mr-1 align-sub text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        ></path>
                      </svg>
                      24 saat içinde cevap
                    </p>
                    <p className="mb-2 flex cursor-pointer">
                      <svg
                        className="w-5 h-5 mr-1 align-sub text-teal-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          clipRule="evenodd"
                          fillRule="evenodd"
                          d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        ></path>
                        <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"></path>
                      </svg>
                      Elle destek
                    </p>
                  </div>
                  <div className="mt-8 w-full flex flex-col">
                    {currentUser.__t === "Mentee" ? (
                      <button
                        className="bg-[#118577] px-4 py-2 rounded-lg text-white w-full text-center"
                        onClick={applyToMentor}
                        disabled={currentUser?.applications.includes(
                          mentor._id
                        )}
                      >
                        {currentUser?.applications.includes(mentor._id)
                          ? "Başvuruldu"
                          : "Başvur"}
                      </button>
                    ) : null}
                    <div className="mt-2 text-sm flex flex-col">
                      <span className="mt-2 text-slate-600 flex">
                        <svg
                          className="w-5 h-5 align-sub text-slate-500 mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                        Mentorunla anlaş ve başvur.
                      </span>
                      <span className="mt-2 text-slate-600 flex">
                        <svg
                          className="w-5 h-5 align-sub text-slate-500 mr-1"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          ></path>
                        </svg>
                        Kolay iletişim!
                      </span>
                      <span className="mt-2 text-slate-600 flex">
                        <svg
                          className="w-5 h-5 align-sub text-slate-500 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Sadece 2 kişilik yer kaldı!
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorPrice;
