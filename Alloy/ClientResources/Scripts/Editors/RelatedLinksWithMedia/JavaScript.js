define([
    "dojo/_base/declare",
    "dijit/_Widget",
    "dijit/_TemplatedMixin",
    "dojo/text!./templates/Subjects.html",

    "epi/dependency",
    "epi/epi"
], function (
    declare,
    _Widget,
    _TemplatedMixin,
    template,

    dependency,
    epi
) {
    return declare("myApp.editors.Subjects",
        [_Widget, _TemplatedMixin], {
        templateString: template,
        intermediatehanges: false,
        value: null,

        // Event that tells EPiServer when the widget's value has changed.
        onChange: function (value) { },

        _onChange: function (value) {
            console.log("Notifying EPiServer with onChange: " + JSON.stringify(value));
            this.onChange(value);
            console.log("Done notitying EPiServer");
        },

        postCreate: function () {
            this.inherited(arguments);
            this._populateMainSubjects(this.value);
            this._refreshSubSubjects(this.value.subSubjects);

            this.trueContent.innerHTML = JSON.stringify(this.value);
        },

        _populateMainSubjects: function (value) {
            var mainSubjects;
            jQuery.ajax({
                url: '/api/subjectoptions',
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    mainSubjects = JSON.parse(result);
                },
                async: false
            });

            var emptyOpt = this._createOption('00000000-0000-0000-0000-000000000000', '');
            this.mainSubject.appendChild(emptyOpt);

            for (var i = 0; i < mainSubjects.length; i++) {
                var opt = this._createOption(mainSubjects[i].Value, mainSubjects[i].Text);
                this.mainSubject.appendChild(opt);
            }

            if (value) {
                this.mainSubject.value = value.mainSubject;
            }
        },

        _createOption: function (value, text) {
            var opt = document.createElement('option');
            opt.value = value;
            opt.innerHTML = text;
            return opt;
        },

        _refreshSubSubjects: function (selected) {
            var subSubjects;
            var mainSubject = '00000000-0000-0000-0000-000000000000';
            if (this.mainSubject.value) {
                mainSubject = this.mainSubject.value;
            }

            jQuery.ajax({
                url: '/api/subjectoptions/' + mainSubject,
                type: 'GET',
                contentType: 'application/json; charset=utf-8',
                success: function (result) {
                    subSubjects = JSON.parse(result);
                },
                async: false
            });

            this.subSubjects.innerHTML = '';
            for (var i = 0; i < subSubjects.length; i++) {
                var checked = selected.indexOf(subSubjects[i].Value) > -1;
                var span = this._createCheckbox(subSubjects[i].Value, subSubjects[i].Text, checked);
                this.subSubjects.appendChild(span);
            }
        },

        _createCheckbox: function (value, text, checked) {
            var id = 'chk_' + value;
            var checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.value = value;
            checkbox.id = id;
            checkbox.checked = checked;

            var label = document.createElement('label');
            label.htmlFor = id;
            label.appendChild(document.createTextNode(text));

            var span = document.createElement('span');
            span.appendChild(checkbox);
            span.appendChild(label);

            this.connect(span, "onchange", this._onCheckboxChanged);

            return span;
        },

        _arrayAddOrRemove: function (array, value) {
            var index = array.indexOf(value);
            if (index > -1) {
                array.splice(index, 1);
            } else {
                array.push(value);
            }
        },

        _onCheckboxChanged: function (event) {
            if (this.value.subSubjects) {
                var array = this.value.subSubjects;
                this._arrayAddOrRemove(array, event.target.value);
            } else {
                this.value.subSubjects = [event.target.value];
            }

            this._updateValue(false);
        },

        _onMainSubjectChanged: function () {
            this._updateValue(true);
        },

        _updateValue: function (isMainSubjectChanged) {
            if (isMainSubjectChanged) {
                this.value.mainSubject = this.mainSubject.value;
                this.value.subSubjects = [];
                this._refreshSubSubjects([]);
            }

            this.value.isModified = true;
            this._onChange(this.value);

            this.trueContent.innerHTML = JSON.stringify(this.value);
        }
    });
});