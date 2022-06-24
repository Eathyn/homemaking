import serviceType from '../../enum/service-type'
import { getDataSet, getEventParam } from '../../utils/utils'
import Category from '../../model/category'

Component({
  properties: {
    form: Object,
  },
  data: {
    typeList: [
      {
        id: serviceType.PROVIDE,
        name: '在提供',
      },
      {
        id: serviceType.SEEK,
        name: '正在找',
      },
    ],
    typePickerIndex: null,
    categoryList: [],
    categoryPickerIndex: null,
    formData: {
      type: null,
      title: '',
      category_id: null,
      cover_image_id: null,
      description: '',
      designated_place: false,
      begin_date: '',
      end_date: '',
      price: '',
    },
  },
  lifetimes: {
    attached() {
      this._init()
    }
  },
  methods: {
    async _init() {
      const typePickerIndex = this.data.typeList.findIndex((item) => this.data.form.type === item.id)
      const categoryList = await Category.getCategoryList()
      const categoryPickerIndex = categoryList.findIndex((item) => this.data.form.category_id === item.id)

      this.setData({
        typePickerIndex: typePickerIndex !== -1 ? typePickerIndex : null,
        categoryList,
        categoryPickerIndex: categoryPickerIndex !== -1 ? categoryPickerIndex : null,
        formData: {
          type: this.data.form.type,
          title: this.data.form.title,
          category_id: this.data.form.category_id,
          cover_image_id: this.data.form.cover_image ? this.data.form.cover_image.id : null,
          description: this.data.form.description,
          designated_place: this.data.form.designated_place,
          begin_date: this.data.form.begin_date,
          end_date: this.data.form.end_date,
          price: this.data.form.price
        },
      })
    },

    submit() {
      console.log(this.data.formData)
    },

    handleTypeChange(evt) {
      const index = getEventParam(evt, 'value')
      this.setData({
        typePickerIndex: index,
        ['formData.type']: this.data.typeList[index].id,
      })
    },

    handleInput(evt) {
      const value = getEventParam(evt, 'value')
      const field = getDataSet(evt, 'field')
      this.setData({
        [`formData.${field}`]: value,
      })
    },

    handleBindCategoryChange(evt) {
      const index = getEventParam(evt, 'value')
      this.setData({
        categoryPickerIndex: index,
        ['formData.category_id']: this.data.categoryList[index].id
      })
    },

    handleSwitchChange(evt) {
      const res = getEventParam(evt, 'value')
      this.setData({
        ['formData.designated_place']: res
      })
    },

    handleBeginDateChange(evt) {
      const beginDate = getEventParam(evt, 'value')
      this.setData({
        ['formData.begin_date']: beginDate,
      })
    },

    handleEndDateChange(evt) {
      const endDate = getEventParam(evt, 'value')
      this.setData({
        ['formData.end_date']: endDate,
      })
    },
  }
})
