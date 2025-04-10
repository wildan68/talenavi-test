import { addCollection } from '@iconify/iconify'
import tablerIcons from '@iconify-json/tabler/icons.json'

const loadIcons = () => {
  addCollection(tablerIcons)

  const collection = [ tablerIcons ]

  const style = document.createElement('style')

  style.innerHTML = collection
    .map(
      ({ icons, prefix }) => Object.keys(icons)
        .map(
          iconName => `
            .${prefix}-${iconName} {
              width: 24px;
              height: 24px;
              background-color: currentColor;
              -webkit-mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${JSON.stringify(
    encodeURI(icons[iconName as keyof typeof icons].body)
  )}</svg>');
              -webkit-mask-repeat: no-repeat;
              -webkit-mask-size: contain;
              mask-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">${JSON.stringify(
    encodeURI(icons[iconName as keyof typeof icons].body)
  )}</svg>');
              mask-repeat: no-repeat;
              mask-size: contain;
            }`
        )
        .join('\n')
    )
    .join('\n')

  document.head.appendChild(style)
}

export default loadIcons()