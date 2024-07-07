$(document).ready(function() {
    // Accrodion
    $('.questions__list__subheader').click(function(e) {
        e.preventDefault();

        let $currentListItem = $(this).closest('.questions__list');

        if ($currentListItem.hasClass('_active')) {
            $currentListItem.removeClass('_active');
            $(this).next('.questions__list__descr').slideUp();
        } else {
            $('.questions__list').removeClass('_active');
            $('.questions__list__descr').slideUp();

            $currentListItem.addClass('_active');
            $(this).next('.questions__list__descr').slideDown();
        }
    });

    // Burger Menu
    const $menu = $('.mobile-nav'),
        $menuItem = $('.menu_item'),
        $hamburger = $('.header__burger, .mobile-nav__close'); 
    $hamburger.on('click', function() {
        $(this).toggleClass('hamburger_active');
        $menu.toggleClass('mobile-nav_active');
    }); 
    $menuItem.on('click', function() {
        $hamburger.toggleClass('hamburger_active');
        $menu.toggleClass('menu_active');
    });
    function pauseVideo() {
        var youtubeIframe = $('#player')[0];
        
        if (youtubeIframe && youtubeIframe.contentWindow) {
            try {
                youtubeIframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            } catch (error) {
                console.error('Ошибка при отправке сообщения в iframe:', error);
            }
        } else {
            console.error('Элемент iframe с id="youtubeVideo" или его contentWindow не найден.');
        }
    }

    // Modal
    $('[data-modal=youtube]').on('click', function() {
        $('.overlay, #video').fadeIn('slow');
      });

    $('.modal__close, .button-modal, .overlay').on('click', function() {
        $('.overlay, #video').fadeOut('slow');
        pauseVideo();
      });

    $('.modal').on('click', function(event) {
        event.stopPropagation();
      });

    //   Validate Form
    function validateForm(form) {
        // Инициализация валидации
        $(form).validate({
            rules: {
                email: {
                    required: true,
                    email: true
                }
            }
        });
        const isValid = $(form).valid();
        console.log("Validation result:", isValid);
        return isValid;
    }
    $('.bonus__valid').on('click', function(e) {
        e.preventDefault();
        const header = $('.bonus__header');
        const title = $('.bonus__item .title');
        const descr = $('.bonus__descr');
        const bonusInput = $('.bonus__input');
        const bonusEmail = $('.bonus__email');
        const buttonRepeat = $('.bonus__valid_repeat');

        let isFormValid = validateForm('.bonus__form');
        console.log("Is the form valid?", isFormValid);
        header.text("Статус:");
        if (isFormValid) {
            title.text("Ссылка успешно отправлена на ваш e-mail!");
            descr.addClass('bonus__descr_disable');
            bonusInput.addClass('bonus__input_disable');
            bonusEmail.addClass('bonus__email_active');
            bonusEmail.text(bonusInput.val());
            $(this).addClass('bonus__valid_disable');
            buttonRepeat.addClass('bonus__valid_repeat_active');
        } else {
            title.text("Произошла ошибка!\nПопробуйте ещё раз позже...");
            descr.addClass('bonus__descr_disable');
            bonusInput.addClass('bonus__input_disable');
            $(this).addClass('bonus__valid_disable');
            buttonRepeat.addClass('bonus__valid_repeat_active');
        }
      })
    $('.bonus__valid_repeat').on('click', function(e) {
        e.preventDefault();
        const header = $('.bonus__header');
        const title = $('.bonus__item .title');
        const descr = $('.bonus__descr');
        const bonusInput = $('.bonus__input');
        const bonusEmail = $('.bonus__email');
        const buttonBonus = $('.bonus__valid');
        header.text("Бесплатный бонус");
        title.text('Руководство"7 критериев \nнадёжного брокера"');
        descr.removeClass('bonus__descr_disable');
        bonusInput.removeClass('bonus__input_disable');
        bonusInput.val("");
        bonusEmail.removeClass('bonus__email_active');
        bonusEmail.text("");
        $(this).removeClass('bonus__valid_repeat_active');
        buttonBonus.removeClass('bonus__valid_disable');
      })

    // Page Up
    $(document).ready(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 1200) {
                $('.pageup').fadeIn();
            } else {
                $('.pageup').fadeOut();
            }
        });
    
        // Обработка клика по кнопке
        $('.pageup__link').click(function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 'slow');
        });
    });

});