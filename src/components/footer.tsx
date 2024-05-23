const navigation = [
  {
    name: 'X',
    href: 'https://x.com/walnut_dev',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    href: 'https://github.com/walnuthq',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: 'Telegram',
    href: 'https://t.me/walnut_dev',
    icon: (props: any) => (
      <svg viewBox="0 0 256 256" {...props}>
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1.000000, 1.000000)" fillRule="nonzero">
              <circle
                fill="currentColor"
                cx="127.5"
                cy="127.5"
                r="127.5"
              ></circle>
              <path
                d="M172.415,70.843 L56.311,119.098 C50.362,121.547 50.411,124.927 54.672,126.168 L87.962,136.524 L160.86,89.218 C163.546,87.514 165.935,88.398 163.958,90.189 L105.447,143.633 L103.095,176.293 C105.556,176.293 106.727,175.167 108.247,173.69 L120.469,162.055 L155.007,185.646 C160.207,188.719 164.068,187.204 165.37,181.003 L176.835,76.204 C177.944,71.048 174.769,68.514 172.415,70.843 Z"
                fill="#FFFFFF"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer>
      <div className="container mx-auto py-12 md:flex md:items-center md:justify-between">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-sm leading-5 text-gray-500">
            Made with 🖤 by{' '}
            <a href="https://walnut.dev/" target="_blank" className="underline">
              Walnut
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
