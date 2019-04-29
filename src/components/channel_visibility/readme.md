
# ChannelVisibilityView

Use this any place you need to quickly change visibility on a channel.

Pass in `autoSync: true` to save the model immediately after toggle.

    new ChannelVisibilityView
      el: @$('.grid__block__privacy--setting')
      model: @model
      autoSync: true