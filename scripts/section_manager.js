	
'use strict';

class SectionManager {
	constructor(sectionClass) {
		this.timeoutVal = 1;
		this.sections = $(sectionClass);
		this.sectionIndex = 0;
		this.sectionIdData = 'section-id';
		this.visitedLast = false;

		//fill array with 'top' position of each section
		this.sectionTopArr = [];
		$.each(this.sections, (i, e) => {
			this.sectionTopArr[i] = Math.floor($(this.sections[i]).offset().top) - 60;
		});
		this.sectionTopArr[0] += 60;
		this.sectionTopArr[1] += 60;

		//scroll event listener
		var timer;
		$(window).scroll((e) => {
			//timer to log event every ms
			//this updates 'this.sectionIndex' to match current section
			clearTimeout(timer);
			timer = setTimeout(() => {
				//update current section
				this.scrollY = e.currentTarget.scrollY;
				this.scrollY = (this.scrollY < 0) ? 0 : this.scrollY;
				this.updateSectionIndex();
				if (this.callback != undefined)
					this.callback(scrollY);
			}, this.timeoutVal);
		});
	}
	init() {
		this.scrollY = $(window).scrollTop();
		this.scrollY = (this.scrollY < 0) ? 0 : this.scrollY;
		this.updateSectionIndex();
		this.onSectionIndexChange();
	}
	updateSectionIndex() {
		var flag = true;
		var temp;
		for (var i = 0; i < this.sectionTopArr.length - 1; i++) {
			if (this.scrollY >= this.sectionTopArr[i] && this.scrollY < this.sectionTopArr[i + 1]) {
				temp = i;
				flag = false;
				break;
			}
		}
		if (flag) {
			temp = this.sectionTopArr.length - 1;
			this.visitedLast = true;
		}
		if (temp != this.sectionIndex) {
			this.sectionIndex = temp;
			//callback
			this.onSectionIndexChange();
		}
	}
	onSectionIndexChange() {
		//Event callback listener for Section Index changed
		//update navbar position
		if (this.navbar != undefined && this.navbar != null) {
			if (this.scrollY >= this.navbarScrollY) {
				this.navbar.addClass('position-fixed');
				this.navbarPlaceholder.height(this.navbarHeight);
			}
			else {
				this.navbar.removeClass('position-fixed');
				this.navbarPlaceholder.height(0);
			}
		}
		//update the current nav to reflect the current section
		if (this.navItems != undefined && this.navItems != null) {
			this.navItems.removeClass('m-color-accent');
			$.each(this.navItems, (i, e) => {
				if ($(e).data(this.sectionIdData) == this.sectionIndex) {
					$(e).addClass('m-color-accent');
					return false;
				}
			});
		}
		//update timeout val to increase efficiency and decrease load
		if (this.sectionIndex > 1 && this.visitedLast) {
			this.timeoutVal = 50;
		}
		else {
			this.timeoutVal = 1;
		}
	}
	nextSection() {
		this.sectionIndex++;
		if (this.sectionIndex >= this.sections.length)
			this.sectionIndex = 0;
		this.scrollTo('#' + $(this.sections[this.sectionIndex]).attr('id'), true, 600);
		this.scrollY = $(this.sections[this.sectionIndex]).offset().top;
	}
	goToSection(sectionIndex) {
		if (sectionIndex >= this.sections.length || sectionIndex < 0)
			return;
		this.sectionIndex = sectionIndex - 1;
		this.nextSection();
	}
	setNavbar(navbar, navitems) {
		this.navbar = $(navbar);
		this.navItems = $(navitems);
		this.navbarPlaceholder = $('.navbar-placeholder');
		this.navbarScrollY = this.navbar.offset().top;
		this.navbarHeight = this.navbar.height();
		//setup nav click events
		this.navItems.click((e) => {
			var t = $(e.currentTarget).data(this.sectionIdData);
			if (t != this.sectionIndex)
				this.goToSection(t);
		});
	}
	scrollTo(elementSelector, enableAnim, animTime) {
		if (enableAnim) {
			$('html, body').animate({
				scrollTop: $(elementSelector).offset().top
			}, animTime);
		}
		else {
			$('html, body').scrollTop($(elementSelector).offset().top);
		}
	}
	setOnControlledScrollCallBack(callback) {
		this.callback = callback;
	}
};








