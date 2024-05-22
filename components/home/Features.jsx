import Image from "next/image";

const features = [
  {
    name: "Mentorunu bul",
    description:
      "Morbi viverra dui mi arcu sed. Tellus semper adipiscing suspendisse semper morbi. Odio urna massa nunc massa.",
    link: "https://cdn.mentorcruise.com/img/home/icons/mc-logo.svg",
  },
  {
    name: "Mentorship için kaydol",
    description:
      "Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.",
    link: "https://cdn.mentorcruise.com/img/home/icons/mc-edit.svg",
  },
  {
    name: "Yeteneklerini geliştir",
    description:
      "Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.",
    link: "https://cdn.mentorcruise.com/img/home/icons/mc-rocket.svg",
  },
  {
    name: "Kariyerini ilerlet",
    description:
      "Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.",
    link: "https://www.svgrepo.com/show/45691/briefcase.svg",
  },
];

const backgroundImageUrl =
  "https://salient.tailwindui.com/_next/static/media/background-features.5f7a9ac9.jpg";

export default function Features() {
  return (
    <div
      id="features"
      className="py-24 sm:py-32 bg-cover bg-center"
      style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7">
            Daha hızlı öğren
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Parmaklarınızın ucunda: özel bir kariyer koçu.
          </p>
          <p className="mt-6 text-lg leading-8 text-blue-100">
            Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
            Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
            In mi viverra elit nunc.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 ">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-white-600">
                    <Image
                      src={feature.link}
                      width={100}
                      height={100}
                      alt=""
                      className="bg-inherit"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-blue-100">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
