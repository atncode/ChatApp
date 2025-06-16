const ru = {
  translation: {
    languages: {
      ru: 'Русский',
    },
    messages: {
      key_one: '{{count}} сообщение',
      key_few: '{{count}} сообщения',
      key_many: '{{count}} сообщений',
    },
    navigation: {
      main: 'Hexlet Chat',
      logout: 'Выйти',
    },
    titles: {
      login: 'Войти',
      signup: 'Регистрация',
      chnls: 'Каналы',
      pageNotFound: 'Страница не найдена',
    },
    buttons: {
      login: 'Войти',
      signup: 'Зарегистрироваться',
      cancel: 'Отменить',
      send: 'Отправить',
      delete: 'Удалить',
      rename: 'Переименовать',
    },
    links: {
      signup: 'Регистрация',
      toMainPage: 'на главную страницу',
    },
    spans: {
      noacc: 'Нет аккаунта? ',
      chnlmanagment: 'Управление каналом',
    },
    p: {
      areyoushure: 'Уверены?',
      goto: 'Но вы можете перейти ',
    },
    labels: {
      nickname: 'Ваш ник',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
    },
    successAlert: 'Канал создан',
    validation: {
      errors: {
        auth: 'Неверные имя пользователя или пароль',
        isExist: 'Такой пользователь уже существует',
        min3: 'От 3 до 20 символов',
        min6: 'Не менее 6 символов',
        max: 'От 3 до 20 символов',
        required: 'Обязательное поле',
        oneOf: 'Пароли должны совпадать',
        notOneOf: 'Должно быть уникальным',
      }
    }
  }
}

export default { ru };
