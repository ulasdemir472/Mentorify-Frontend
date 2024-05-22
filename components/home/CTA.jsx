import React from "react";
import Image from "next/image";

const CTA = () => {
  return (
    <div
      id="cta"
      className="mx-auto py-12 px-4 max-w-7xl sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="space-y-12">
        <div className="mx-auto bg-white z-50 space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
          <h2 className="relative text-3xl lg:text-center mx-auto max-w-2xl font-bold tracking-tight sm:text-4xl text-gray-900">
            Yeni beceriyi öğrenin, projeyi başlatın, hayalinizdeki kariyere
            ulaşın.
          </h2>
          <p className="relative text-lg lg:text-center mx-auto max-w-3xl text-gray-600">
            Çevrimiçi mentorunuz kariyerinizi yükseltebilir veya
            yaslanabileceğiniz bir omuz olabilir. Özel çalışma planları, düzenli
            kontroller ve sınırsız eyleme dönüştürülebilir destek dahil olmak
            üzere kişiselleştirilmiş bir mentorluk programı edinin. Dünyanın
            dört bir yanına yayılan çevrimiçi mentor topluluğunun bir parçası
            olun.
          </p>
        </div>
        <ul className="space-y-4 sm:grid sm:grid-cols-1 sm:gap-2 lg:grid-cols-2 lg:gap-8">
          <li className="max-w-lg mx-auto p-6 text-left rounded-lg xl:px-10">
            <div className="space-y-2">
              <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                <div className="text-lg leading-6 space-y-1">
                  <div className="flex items-center space-x-4 py-4">
                    <Image
                      src="https://cdn.mentorcruise.com/img/home/icons/chat-bubble.svg"
                      alt="Chat Bubble"
                      width={25}
                      height={25}
                    />
                    <span className="font-bold text-base">MESAJ</span>
                  </div>
                  <div className="flex">
                    <h3 className="font-bold text-3xl">
                      Uzman danışmanlık. Bir mesaj uzağınızda.
                    </h3>
                  </div>
                  <div>
                    <p className="my-4 text-base">
                      Sınırsız mesajlaşma ile çevrimiçi mentorluk
                      oturumlarınızda sorular sorun, yeni bir fikir üzerinde
                      fikir alışverişinde bulunun veya mesleki ilerleme ve
                      gelişmeleri tartışın.
                    </p>
                    <p className="my-4 text-base">
                      Have an upcoming interview at{" "}
                      <a href="" className="text-navy-900 underline">
                        Amazon
                      </a>
                      ? Need help in{" "}
                      <a href="" className="text-navy-900 underline">
                        product management
                      </a>{" "}
                      or{" "}
                      <a href="" className="text-navy-900 underline">
                        marketing
                      </a>
                      ? Whatever it is, our online mentors are there for you.
                    </p>
                  </div>
                  <div>
                    <p className="my-4 text-base font-bold">
                      Günlük işlerinizde daha az kesinti ve daha kolay
                      dokümantasyon. Bir mesaj uzağınızda, mentorunuzdan size
                      uygun bir zamanda uzman rehberliği alın.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="hidden lg:block mx-auto">
            <picture className="max-w-screen-lg">
              <source
                srcSet="https://cdn.mentorcruise.com/img/home/screenshots/chat-screen_2x.webp"
                type="image/webp"
              />
              <source
                srcSet="https://cdn.mentorcruise.com/img/home/screenshots/chat-screen_2x.png"
                type="image/png"
              />
              <source
                srcSet="https://cdn.mentorcruise.com/img/home/screenshots/chat-screen_1x.webp"
                className="image-enhancer"
                type="image/webp"
              />
              <img
                src="https://cdn.mentorcruise.com/img/home/screenshots/chat-screen_2x.png"
                alt="Our Chat"
                className="image-enhancer"
              />
            </picture>
          </li>
          <li className="hidden lg:block mx-auto max-w-lg">
            <picture className="max-w-screen-lg">
              <source
                srcSet="https://cdn.mentorcruise.com/img/home/screenshots/conversation_2x.webp 2x"
                type="image/webp"
              />
              <source
                srcSet="https://cdn.mentorcruise.com/img/home/screenshots/conversation_2x.png 2x"
                type="image/png"
              />
              <source
                srcSet="https://cdn.mentorcruise.com/img/home/screenshots/conversation_1x.webp"
                className="image-enhancer"
                type="image/webp"
              />
              <img
                src="https://cdn.mentorcruise.com/img/home/screenshots/conversation_1x.png"
                alt="Coding Challenge"
                className="image-enhancer"
              />
            </picture>
          </li>
          <li className="max-w-lg mx-auto p-6 text-left rounded-lg xl:px-10">
            <div className="space-y-2">
              <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                <div className="text-lg leading-6 space-y-1">
                  <div className="flex items-center space-x-4 py-4">
                    <img
                      src="https://cdn.mentorcruise.com/img/home/icons/goals-icon.svg"
                      alt="Goals"
                    />
                    <span className="font-bold text-base">
                      KILOMETRE TAŞLARI OLUŞTURUN
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-3xl">
                      Uzman rehberliği sayesinde kısa yoldan büyüme.
                    </h3>
                  </div>
                  <div>
                    <p className="my-4 text-base">
                      Deneyimlerden ve kuruculardan paha biçilmez bilgiler
                      edinin. Etkili mentorluk sayesinde, sonraki adımlarınızı
                      belirlemek için harcadığınız zamanı ortadan kaldırın. Bir
                      eylem planı edinin ve tutarlı mentorluk seanslarından
                      bilgelik kazanın.
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <picture className="flex items-center max-w-screen-lg w-12 h-12">
                      <source
                        srcSet="https://cdn.mentorcruise.com/img/faces/tomray_2x.webp 2x"
                        type="image/webp"
                        alt="Tom Ray"
                        className="rounded-full w-12 h-12"
                      />
                      <source
                        srcSet="https://cdn.mentorcruise.com/img/faces/tomray_2x.png 2x"
                        type="image/png"
                        alt="Tom Ray"
                        className="rounded-full w-12 h-12"
                      />
                      <source
                        srcSet="https://cdn.mentorcruise.com/img/faces/tomray_1x.webp"
                        type="image/webp"
                        alt="Tom Ray"
                        className="image-enhancer rounded-full w-12 h-12"
                      />
                      <img
                        src="https://cdn.mentorcruise.com/img/faces/tomray_1x.png"
                        alt="Tom Ray"
                        className="image-enhancer rounded-full w-12 h-12"
                      />
                    </picture>
                    <div className="flex flex-col">
                      <p className="text-sm italic">
                        Sadece birkaç hafta içinde React dünyasında gezinirken
                        kendime ÇOK daha fazla güveniyorum. Chris mükemmel bir
                        akıl hocası oldu.
                      </p>
                      <p className="text-sm italic font-bold">
                        - Tom Ray, a{" "}
                        <a
                          href="/coach/React/"
                          className="underline text-navy-900"
                        >
                          React
                        </a>{" "}
                        mentee.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <a href="">
            <button
              type="button"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              href=""
            >
              Mentor bul
            </button>
          </a>
          <a
            className="flex justify-center w-full md:w-auto text-sm underline font-semibold text-navy-900 hover:text-mc-green"
            href="/"
          >
            Mentor ol
          </a>
        </div>
      </div>
    </div>
  );
};

export default CTA;
